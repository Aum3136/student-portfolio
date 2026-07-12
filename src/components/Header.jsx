function Header({ name, themeColor }) {
  return (
    <header style={{ backgroundColor: themeColor, padding: "2rem", color: "white", textAlign: "center" }}>
      <h1>{name}'s Portfolio</h1>
    </header>
  );
}

export default Header;