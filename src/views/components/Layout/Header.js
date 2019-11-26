import React from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import UploadIcon from '@material-ui/icons/CloudUploadRounded';
import HomeIcon from '@material-ui/icons/Home';
import PanToolIcon from '@material-ui/icons/PanTool';
import BuildIcon from '@material-ui/icons/Build';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { URL_SET } from '../assets/constants';
import logo from '../assets/naruto.png';


// styled components
const StyledAppBar = styled(AppBar)`
  position: fixed;
  z-index: ${props => props.theme.zIndex.drawer + 1};
`;

const StyledDivRight = styled.div`
  margin-left: auto;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const StyledImage = styled.img`
  height: 50px;
`;


// custom components
const AppTitle = () => (
  <StyledLink to={URL_SET.root}>
    <StyledImage src={logo} alt="ロゴ" title="Nokia Automation Radio Upgrade Tool">
    </StyledImage>
  </StyledLink>
);

const BasicIconButton = ({ icon, note, onClick }) => (
  <Tooltip title={note}>
    <IconButton
      color="inherit"
      onClick={onClick}
    >
      {icon}
    </IconButton>
  </Tooltip>
);

const IconButtonWithLink = props => (
  <StyledLink to={props.to}>
    <BasicIconButton {...props} />
  </StyledLink>
);

const Header = props => {
  const { handleClickLogout, schedule } = props;

  return (
    <StyledAppBar>
      <Toolbar>
        <AppTitle />
        <StyledDivRight>

          <IconButtonWithLink
            to={URL_SET.settings}
            note="設定"
            icon={<BuildIcon />}
          />

          {schedule.id &&
            <IconButtonWithLink
              to={URL_SET.manual}
              note="業務ツール単体実行"
              icon={<PanToolIcon />}
            />
          }

          <IconButtonWithLink
            to={URL_SET.masterLists}
            note="MasterListアップロード"
            icon={<UploadIcon />}
          />

          <IconButtonWithLink
            to={URL_SET.root}
            note="トップページ"
            icon={<HomeIcon />}
          />

          {schedule.id &&
            <BasicIconButton
              note="ログアウト"
              icon={<ExitToAppIcon />}
              onClick={handleClickLogout}
            />
          }
        </StyledDivRight>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;
