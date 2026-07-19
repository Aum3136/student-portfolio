// Soft ambient shapes drifting behind the hero — the CSS equivalent of the
// blurred Lottie circles used on the reference site, without the extra dependency.
function AmbientBlobs() {
  return (
    <div className="ambient-blobs" aria-hidden="true">
      <span className="blob blob-a" />
      <span className="blob blob-b" />
    </div>
  )
}

export default AmbientBlobs
