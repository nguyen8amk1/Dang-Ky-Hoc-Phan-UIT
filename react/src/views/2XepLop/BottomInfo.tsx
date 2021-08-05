import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectSelectedClasses } from 'redux/xepTkb/selectors';
import { calcTongSoTC } from 'utils';

type Props = {
  rowCount: number;
};

function BottomInfo({ rowCount }: Props) {
  const cacLop = useSelector(selectSelectedClasses);
  const tongSoTC = calcTongSoTC(cacLop);

  return (
    <Box mt={1} display="flex" justifyContent="space-between">
      <TextField disabled size="small" variant="standard" value={'Số dòng: ' + rowCount} />

      {/*{isTrungTkb ? (*/}
      {/*  <Alert severity="error" style={{ marginBottom: -15 }}>*/}
      {/*    <strong>Trùng thời khóa biểu!!!</strong>*/}
      {/*  </Alert>*/}
      {/*) : null}*/}

      <Tooltip
        title={
          tongSoTC < 14
            ? 'Chưa đạt số TC quy định: 14'
            : tongSoTC > 24
            ? 'Vượt quá số TC quy định: 24'
            : 'Số TC quy định là 14-24'
        }
      >
        <TextField
          size="small"
          variant="standard"
          value={'Số tín chỉ: ' + tongSoTC}
          InputProps={{
            readOnly: true,
            style: {
              fontWeight: 500,
              color: `${tongSoTC < 14 || tongSoTC > 24 ? 'red' : 'green'}`,
            },
          }}
        />
      </Tooltip>
    </Box>
  );
}

export default BottomInfo;
