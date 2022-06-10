const d = document;
const w = window;

// We need a list of tiles to figure out the width of the active one
const heroTilesNodelist = d.querySelectorAll('#main_hero > section');

const swapClass = (passedClass, passedObject, passedTarget = undefined) => {
  /**
  * Parameters passedClass and passedObject are mandatory.
  * Parameter passedTarget is optional.
  * 
  * Parameter passedClass holds the class that needs to be swapped (added if
  * absent or removed is present).
  * 
  * Parameter passedObject represents either NodeList or Array of HTML
  * elements or a single HTML element that the function should swap class on.
  * 
  * Parameter passedTarget, if present, has to be an element in passedObject
  * (NodeList or Array) and will be the first element to have class swapped.
  * All the other elements in the passedObject will either have class added
  * or removed depending on what happen to passedTarget.
  * 
  * If passedTarget is not present then toggle passedClass on passedObject
  * or on each element in passedObject.
  */

  // -------------------------- Error handler -------------------------------
  const drawError = (message = 'Unidentified error') => {
    // In the future i would love to expend on this error handler and have
    // more detailed error messages to be drawn with the ability to draw
    // on the screen in the message box or something. For now this will do.
    return console.log(`Script error in swapClass().\n${message}`)
  }

  // -------------------------- Type Checking -------------------------------
  if (typeof passedClass !== 'string') {
    return drawError(`Parameter "passedClass" is of wrong type.\n` +
      `Expected "string", got "${typeof passedClass}"`)
  }
  else if (typeof passedObject !== 'object') {
    return drawError(`Parameter "passedObject" is of wrong type.\n` +
      `Expected "object", got "${typeof passedObject}"`)
  }
  else if (passedTarget !== undefined && typeof passedTarget !== 'object') {
    return drawError(`Parameter "passedTarget" is of wrong type.\n` +
      `Expected "object", got "${typeof passedTarget}"`)
  }

  // ------------------------ Array Conversion ------------------------------
  // Because passedObject can be either Array, NodeList or HTML Element
  passedObject = (passedObject instanceof HTMLElement) ? [passedObject]
    : [...passedObject]

  if (passedTarget !== undefined) {
    // Early return with error message if passedTarget is not in
    // passedObject. Maybe in some cases would make sense to have a
    // redirector to keep the function going outside this scope, but here
    // we are just going to return a console message and thats it.
    if (!passedObject.includes(passedTarget)) {
      return drawError(`"passedTarget" is not in "passedObject".`)
    }

    passedObject.forEach((item, index) => {
      if (item === passedTarget) {
        item.classList.contains(passedClass) || item.classList.add(passedClass)
      }
      else item.classList.remove(passedClass)
    })
  }
}

heroTilesNodelist.forEach(_element => {
  _element.addEventListener('mouseenter', () => {
    swapClass('hero_active', heroTilesNodelist, _element);
  })
})

