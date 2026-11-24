import { Link } from "react-router-dom";
export default function NotFound() {
  return <main className="page-section container"><span className="eyebrow">ERROR 404</span><h1 className="page-title">Page not <em>found.</em></h1><p className="page-intro">The page you're looking for doesn't exist or has moved.</p><Link className="button button-primary" to="/">Back to home</Link></main>;
}
