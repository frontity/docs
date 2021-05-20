# How to process page-builder content in Frontity

The problem to be solved - use case
	page created with a page builder
	improve performance by adapting to Frontity

	How do page builders work
	generate html
		html can be detected, matched and processed with a processor - return a React component
		Generic styles can be loaded in Frontity

Load the generic styles (page-builder styles in Global) - will affect performance
Conceptual overview to  processors - return custom styled blocks

Examples
	Gutenberg
	Elementor