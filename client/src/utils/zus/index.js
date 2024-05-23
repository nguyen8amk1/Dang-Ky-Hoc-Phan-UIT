import { partition } from "lodash"
import { memoize } from "proxy-memoize"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
//import { tracker } from ".."
//import { calcTongSoTC, isSameAgGridRowId } from "../utils"
import { isSameAgGridRowId } from "../../utils"

export const useUtilsStore = create()(set => ({
    hasAdBlocker: false
}))

export const useDrawerStore = create()(
    persist(
        (set, get) => ({
            isDrawerOpen: document.body.offsetWidth > 900,
            toggleDrawer: () => {
                const newState = !get().isDrawerOpen
                //tracker.track("[drawer] toggled", { newState })
                set({ isDrawerOpen: newState })
            }
        }),
        {
            name: "drawer-state-storage",
            storage: createJSONStorage(() => sessionStorage)
        }
    )
)

export const useTkbStore = create()(
    persist(
        (set, get) => ({
            dataExcel: null,

            selectedClasses: [], // [{}, {}]
            agGridColumnState: null,
            agGridFilterModel: null,

            isChiVeTkb: false,
            textareaChiVeTkb: "",

            // TODO: move actions outside of store
            setDataExcel: data => {
                const newDataExcel = data?.data ?? []
                const currentSelectedClasses = get().selectedClasses
                // When the user uploads a new excel file:
                // - when it's a new semester, the AgGridRowId will be different => selectedClasses will be cleared
                // - when it's an updated excel file of the same semester, the AgGridRowId will be the same => keep selectedClasses
                const newSelectedClasses = newDataExcel.filter(newClass =>
                    currentSelectedClasses.some(selectedClass =>
                        isSameAgGridRowId(selectedClass, newClass)
                    )
                )
                set({ dataExcel: data, selectedClasses: newSelectedClasses })
            },
            setSelectedClasses: data => {
                set({ selectedClasses: data })
            },
            removeClasses: classesToRemove => {
                set(state => ({
                    selectedClasses: state.selectedClasses.filter(selectedClass =>
                        classesToRemove.every(
                            classToRemove => !isSameAgGridRowId(selectedClass, classToRemove)
                        )
                    )
                }))
            },
            setAgGridColumnState: data => {
                set({ agGridColumnState: data })
            },
            setAgGridFilterModel: data => {
                set({ agGridFilterModel: data })
            },
            setIsChiVeTkb: data => {
                set({ isChiVeTkb: data })
            },
            setTextareChiVeTkb: data => {
                set({ textareaChiVeTkb: data.toUpperCase() })
            }
        }),
        {
            name: "tkb-state-storage",
            storage: createJSONStorage(() => localStorage)
        }
    )
)

export const withStorageDOMEvents = store => {
    const storageEventCallback = e => {
        if (e.key === store.persist.getOptions().name && e.newValue) {
            store.persist.rehydrate()
        }
    }
    window.addEventListener("storage", storageEventCallback)
    return () => {
        window.removeEventListener("storage", storageEventCallback)
    }
}
// sync state between tabs: https://github.com/pmndrs/zustand/issues/714
// TODO: more granular sync (only sync selectedClasses, not all state)
withStorageDOMEvents(useTkbStore)

export const selectDataExcel = state => state.dataExcel
export const selectSelectedClasses = state => state.selectedClasses
export const selectAgGridColumnState = state => state.agGridColumnState
export const selectAgGridFilterModel = state => state.agGridFilterModel
export const selectIsChiVeTkb = state =>
    state.isChiVeTkb || window.location.search.includes("self_selected") // TODO: constant for self_selected
export const selectTextareaChiVeTkb = state => {
    const searchParams = new URLSearchParams(window.location.search)
    return searchParams.get("self_selected") || state.textareaChiVeTkb // TODO: won't get notified when URLSearchParams change, currently we have to add search params when route change in LeftDrawer as a hack
}
export const selectFinalDataTkb = state => {
    const dataExcel = selectDataExcel(state)
    return dataExcel?.data ?? []
}

export const selectSelectedClassesBuoc3 = memoize(state => {
    const isChiVeTkb = selectIsChiVeTkb(state)
    const textareaChiVeTkb = selectTextareaChiVeTkb(state)
    const finalDataTkb = selectFinalDataTkb(state)

    if (isChiVeTkb) {
        const listMaLop = textareaChiVeTkb.split(/\s+|\+|,/)
        return finalDataTkb.filter(it => listMaLop.includes(it.MaLop))
    } else {
        return selectSelectedClasses(state)
    }
})

// export const selectTongSoTcSelected = state =>
//   calcTongSoTC(selectSelectedClasses(state))
// export const selectTongSoTcBuoc3 = state =>
//   calcTongSoTC(selectSelectedClassesBuoc3(state))

export const selectPhanLoaiHocTrenTruong = memoize(state => {
    return partition(selectSelectedClassesBuoc3(state), { Thu: "*" })
  //return null;
})
