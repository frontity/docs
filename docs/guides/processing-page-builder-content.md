# How to process page-builder content in Frontity

### Introduction
- page builders increasingly popular: Elementor, Gutenberg, Divi, etc...
- Gutenberg is the future of WP
-	pages/posts created with a page builder

### The problem to be solved - use case
-	wish to gain the performance benefits of Frontity by adopting it in the front end for sites that use a page builder
- with headless the appearance in the visual editor is not replicated in the front end because of the way in which they work

### How do page builders work
- visual interface (allows technically unskilled to create pages)
  -	generate html - stored in post content
  - will have a generic stylesheet

### What we can do
-	html can be detected, matched and processed with a processor - return a React component
-	Generic styles can be loaded in Frontity (using Global  - may affect performance - CSS-in-JS is a better option - but not viable in this case)

### Processors
- Conceptual overview of processors - return custom styled blocks as a React component

### Examples
-	Gutenberg
-	Elementor