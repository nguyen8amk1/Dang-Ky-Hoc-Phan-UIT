import AgGrid from './AgGrid';
import TrungTkbDialog, { TrungTkbDialogContext } from './TrungTkbDialog';

export default function Index(props) {
    return (
        <div style={{ minWidth: '100%' }}>
            <TrungTkbDialogContext>
                <AgGrid />
                <TrungTkbDialog />
            </TrungTkbDialogContext>
        </div>
    );
}
