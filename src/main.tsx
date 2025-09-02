import React from "react";
import * as ReactDOMClient from "react-dom/client";
import reactToWebComponent from "react-to-webcomponent";
import Editor from "./Editor";
import App from "./App";
import './index.css';

// Shim for react-to-webcomponent
const ReactDOMForWc: any = {
	render: (element: React.ReactElement, container: HTMLElement) => {
		const root = ReactDOMClient.createRoot(container);
		(container as any).__root = root; // save it on container
		root.render(element);
	},
	unmountComponentAtNode: (container: HTMLElement) => {
		const root = (container as any).__root;
		if (root) {
			root.unmount();
			delete (container as any).__root;
		}
	},
};


if (import.meta.env.MODE !== "production") {
	// Dev: render playground <App /> into #root
	const container = document.getElementById("root");
	if (container) {
		const root = ReactDOMClient.createRoot(container);
		root.render(
			<React.StrictMode>
				<App />
			</React.StrictMode>
		);
	}
} else {
	// Prod: export <lexical-editor> wrapping Editor
	const LexicalElement = reactToWebComponent(App, React, ReactDOMForWc);
	customElements.define("lexical-editor", LexicalElement);
}
