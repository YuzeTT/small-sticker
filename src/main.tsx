import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import 'virtual:uno.css'
import './index.css'
import { H } from 'highlight.run';
// import { ErrorBoundary } from '@highlight-run/react';

H.init('4d73jv1g', {
	serviceName: "frontend-app",
	tracingOrigins: true,
	networkRecording: {
		enabled: true,
		recordHeadersAndBody: true,
		urlBlocklist: [
			// insert full or partial urls that you don't want to record here
			// Out of the box, Highlight will not record these URLs (they can be safely removed):
			"https://www.googleapis.com/identitytoolkit",
			"https://securetoken.googleapis.com",
		],
	},
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <ErrorBoundary>
      <App />,
  // </ErrorBoundary>,
)
