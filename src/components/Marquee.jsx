function Marquee({ items }) {
  // Duplicate the list once so the CSS animation can loop seamlessly.
  const loop = [...items, ...items]
  return (
    <div className="marquee">
      <div className="marquee-track">
        {loop.map((item, i) => (
          <span className="marquee-item" key={`${item}-${i}`}>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

export default Marquee
