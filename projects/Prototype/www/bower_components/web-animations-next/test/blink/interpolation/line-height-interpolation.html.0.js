
assertInterpolation({
  property: 'line-height',
  from: '4',
  to: '14'
}, [
  {at: -1, is: '0'},
  {at: -0.3, is: '1'},
  {at: 0, is: '4'},
  {at: 0.3, is: '7'},
  {at: 0.6, is: '10'},
  {at: 1, is: '14'},
  {at: 1.5, is: '19'},
]);
assertInterpolation({
  property: 'line-height',
  from: '4px',
  to: '14px'
}, [
  {at: -1, is: '0px'},
  {at: -0.3, is: '1px'},
  {at: 0, is: '4px'},
  {at: 0.3, is: '7px'},
  {at: 0.6, is: '10px'},
  {at: 1, is: '14px'},
  {at: 1.5, is: '19px'},
]);
assertInterpolation({
  property: 'line-height',
  from: 'normal',
  to: 'normal'
}, [
  {at: -0.3, is: 'normal'},
  {at: 0, is: 'normal'},
  {at: 0.3, is: 'normal'},
  {at: 0.6, is: 'normal'},
  {at: 1, is: 'normal'},
  {at: 1.5, is: 'normal'},
]);
assertInterpolation({
  property: 'line-height',
  from: '4',
  to: '14px'
}, [
  {at: -0.3, is: '4'},
  {at: 0, is: '4'},
  {at: 0.3, is: '4'},
  {at: 0.6, is: '14px'},
  {at: 1, is: '14px'},
  {at: 1.5, is: '14px'},
]);
assertInterpolation({
  property: 'line-height',
  from: '14px',
  to: 'normal'
}, [
  {at: -0.3, is: '14px'},
  {at: 0, is: '14px'},
  {at: 0.3, is: '14px'},
  {at: 0.6, is: 'normal'},
  {at: 1, is: 'normal'},
  {at: 1.5, is: 'normal'},
]);
assertInterpolation({
  property: 'line-height',
  from: 'normal',
  to: '4'
}, [
  {at: -0.3, is: 'normal'},
  {at: 0, is: 'normal'},
  {at: 0.3, is: 'normal'},
  {at: 0.6, is: '4'},
  {at: 1, is: '4'},
  {at: 1.5, is: '4'},
]);
assertInterpolation({
  property: 'line-height',
  from: '4',
  to: 'normal'
}, [
  {at: -0.3, is: '4'},
  {at: 0, is: '4'},
  {at: 0.3, is: '4'},
  {at: 0.6, is: 'normal'},
  {at: 1, is: 'normal'},
  {at: 1.5, is: 'normal'},
]);
assertInterpolation({
  property: 'line-height',
  from: 'normal',
  to: '14px'
}, [
  {at: -0.3, is: 'normal'},
  {at: 0, is: 'normal'},
  {at: 0.3, is: 'normal'},
  {at: 0.6, is: '14px'},
  {at: 1, is: '14px'},
  {at: 1.5, is: '14px'},
]);
assertInterpolation({
  property: 'line-height',
  from: '14px',
  to: '4'
}, [
  {at: -0.3, is: '14px'},
  {at: 0, is: '14px'},
  {at: 0.3, is: '14px'},
  {at: 0.6, is: '4'},
  {at: 1, is: '4'},
  {at: 1.5, is: '4'},
]);
assertInterpolation({
  property: 'line-height',
  from: '4vw',
  to: '14vw'
}, [
  {at: -1, is: '0'},
  {at: -0.3, is: '1vw'},
  {at: 0, is: '4vw'},
  {at: 0.3, is: '7vw'},
  {at: 0.6, is: '10vw'},
  {at: 1, is: '14vw'},
  {at: 1.5, is: '19vw'},
]);
// These tests assume a viewport of 800x600.
// assertInterpolation({
//   property: 'line-height',
//   from: '50vmin',
//   to: '100px'
// }, [
//   {at: -0.25, is: '350px'},
//   {at: 0, is: '300px'},
//   {at: 0.25, is: '250px'},
//   {at: 0.75, is: '150px'},
//   {at: 1, is: '100px'},
//   {at: 1.5, is: '0px'},
// ]);
// assertInterpolation({
//   property: 'line-height',
//   from: '100px',
//   to: '50vmax'
// }, [
//   {at: -0.25, is: '25px'},
//   {at: 0, is: '100px'},
//   {at: 0.25, is: '175px'},
//   {at: 0.75, is: '325px'},
//   {at: 1, is: '400px'},
//   {at: 1.5, is: '550px'},
// ]);
// assertInterpolation({
//   property: 'line-height',
//   from: '75vw',
//   to: '25vh'
// }, [
//   {at: -0.25, is: '712.5px'},
//   {at: 0, is: '600px'},
//   {at: 0.25, is: '487.5px'},
//   {at: 0.75, is: '262.5px'},
//   {at: 1, is: '150px'},
//   {at: 1.5, is: '0px'}, // line-height must not be less than 0.
// ]);
