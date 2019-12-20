'use strict';

var react = require('react');

var index = initialValue => {
  let _updaters = [];
  let _value = initialValue;

  const useSingleton = () => {
     const [value, update] = react.useState(_value);
 
     react.useEffect(() => {
       _updaters.push(update);
       return () => (_updaters = _updaters.filter(el => el !== update));
     }, []);
 
     return value;
  };

  const updateSingleton = updateValue => {
    _value = typeof updateValue === 'function' ? updateValue(_value) : updateValue;
    _updaters.forEach(cb => cb(_value));
  };

  return [useSingleton, updateSingleton];
};

module.exports = index;
