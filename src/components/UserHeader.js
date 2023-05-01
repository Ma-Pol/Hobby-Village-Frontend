import React from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  InputBase,
  Avatar,
} from "@mui/material";
import { styled, alpha } from "@mui/system";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const StyledAppBar = styled(AppBar)({
  backgroundColor: "#ffffff",
  boxShadow: "none",
  borderBottom: "none",
  marginBottom: "1rem",
});

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  maxWidth: "1150px",
  margin: "0 auto",
  width: "100%",
  padding: "1.5rem 1rem 0 1rem",
});

const MenuItems = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "1rem",
});

const Search = styled("div")({
  position: "relative",
  borderRadius: "12px",
  backgroundColor: alpha("#000", 0.1),
  marginRight: "1rem",
  width: "auto",
});

const SearchInput = styled(InputBase)({
  color: "inherit",
  "& > input": {
    padding: "12px 12px 12px 12px",
    width: "280px",
  },
});

const BlackTextTypography = styled(Typography)({
  color: "#000000",
});

const UserInfo = styled("div")({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "1rem",
  position: "absolute",
  top: 0,
  right: "2rem",
});

const SmallTextTypography = styled(Typography)({
  fontSize: "0.75rem",
  color: "#000000",
});

// 임시 이미지
const profileImageUrl = "https://via.placeholder.com/150";

function UserHeader() {
  return (
    <StyledAppBar position="static">
      <StyledToolbar>
        <MenuItems>
          <Link to="/" style={{ textDecoration: "none" }}>
            <BlackTextTypography
              style={{
                color: "#C3C36A",
                fontWeight: 900,
                fontSize: "1.5rem",
                marginRight: "7rem",
                textShadow: "0px 2px 2px rgba(0, 0, 0, 0.2)",
              }}
              variant="h6"
            >
              취미빌리지
            </BlackTextTypography>
          </Link>
          <Button
            component={Link}
            to="/product/lists"
            style={{
              color: "#000000",
              textTransform: "none",
              fontSize: "1.1rem",
              fontWeight: "bold",
            }}
            disableRipple
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            취미 물품
          </Button>
          <Button
            component={Link}
            to="/products/brand/lists"
            style={{
              color: "#000000",
              textTransform: "none",
              fontSize: "1.1rem",
              fontWeight: "bold",
            }}
            disableRipple
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            브랜드관
          </Button>
          <Button
            component={Link}
            to="/recommend"
            style={{
              color: "#000000",
              textTransform: "none",
              fontSize: "1.1rem",
              fontWeight: "bold",
            }}
            disableRipple
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            내 취미 찾기
          </Button>
        </MenuItems>
        <MenuItems>
          <Search>
            <SearchInput
              placeholder="물품이나 취미를 검색해보세요"
              inputProps={{ "aria-label": "search" }}
              style={{ color: "#333" }}
            />
          </Search>
          <Link
            to={`/carts/:email/lists/:category`}
            style={{ textDecoration: "none" }}
          >
            <ShoppingCartIcon style={{ color: "#000000" }} />
          </Link>
          <Link to={`/mypages/:email`} style={{ textDecoration: "none" }}>
            <BlackTextTypography variant="subtitle1">
              닉네임
            </BlackTextTypography>
          </Link>
          <Link to={`/mypages/:email`} style={{ textDecoration: "none" }}>
            <Avatar alt="프로필 이미지" src={profileImageUrl} />
          </Link>
        </MenuItems>
        <UserInfo>
          <SmallTextTypography>로그아웃</SmallTextTypography>
          <Link to="/cs" style={{ textDecoration: "none" }}>
            <SmallTextTypography>고객센터</SmallTextTypography>
          </Link>
        </UserInfo>
      </StyledToolbar>
    </StyledAppBar>
  );
}

export default UserHeader;