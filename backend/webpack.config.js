import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer"

// Webpack configuration
export const plugins = [
	// other plugins...
	new BundleAnalyzerPlugin({
		// Options for controlling how the report looks can be added here
	})
]
