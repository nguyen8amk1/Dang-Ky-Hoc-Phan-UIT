import VisibilityIcon from '@mui/icons-material/Visibility';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCustomViewMode, selectFilteredMonHoc, selectListMaMHTextarea } from 'redux/xepTkb/selectors';
import { setCustomViewMode, setListMaMHTextarea } from 'redux/xepTkb/slice';
import { VIEW_MODES } from 'redux/xepTkb/types';

function TopInputs() {
  const dispatch = useDispatch();
  const listMaMHTextarea = useSelector(selectListMaMHTextarea);
  const filteredMonHoc = useSelector(selectFilteredMonHoc);
  const customViewMode = useSelector(selectCustomViewMode);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Grid container spacing={2} style={{ marginBottom: 10 }}>
      <Grid item flex={1}>
        <Tooltip
          // title="Copy paste từ https://daa.uit.edu.vn/content/chuong-trinh-dao-tao-tu-khoa-7-tro-di"
          title={
            <div style={{ whiteSpace: 'pre-line' }}>
              <p>Copy paste từ https://daa.uit.edu.vn/content/chuong-trinh-dao-tao-tu-khoa-7-tro-di</p>
              {filteredMonHoc.map((it, index) => index + 1 + '. ' + it.MaMH + ' - ' + it.TenMH).join('\n')}
            </div>
          }
        >
          <TextField
            label="Bộ lọc môn"
            placeholder={'IT004 IT005 IT006 EN006 SS004 IT008'}
            fullWidth
            size="small"
            variant="outlined"
            value={listMaMHTextarea}
            onChange={(e) => dispatch(setListMaMHTextarea(e.target.value))}
          />
        </Tooltip>
      </Grid>
      <Grid item style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div>
          <Tooltip title={customViewMode}>
            <IconButton onClick={handleClick} color="primary" style={{ padding: 0 }} size="large">
              <VisibilityIcon />
            </IconButton>
          </Tooltip>
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            {VIEW_MODES.map((option) => (
              <MenuItem
                key={option}
                selected={option === customViewMode}
                onClick={() => {
                  dispatch(setCustomViewMode(option));
                  handleClose();
                }}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
        </div>
      </Grid>
    </Grid>
  );
}

export default TopInputs;
