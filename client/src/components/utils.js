export const isSameAgGridRowId = () => {

}

export const getDanhSachTiet = tiet => {
    if (tiet.includes(",")) return tiet.split(",")
    if (tiet === "*") return ["*"]
    return tiet.split("")
}
