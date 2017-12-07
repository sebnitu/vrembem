# Vrembem

A BEM powered CSS component library.

## Component Structure

Here's an idea I pulled for component architecture. I got it from a talk by David Wells in this talk: https://www.youtube.com/watch?v=j8eBXGPl_5E

/src/components/
  ComponentName/            # Folder
    ComponentName.js        # src code
    ComponentName.css       # styles
    ComponentName.spec.js   # tests
    index.js                # Exports your component
    examples/               # Usage examples
      component_usage.js      #Examples of component usage
