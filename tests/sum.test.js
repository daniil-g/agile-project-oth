/**
 * This file should always work and be testable. If it fails, it means your testframwork or envirement is not correctly set. 
 * -> Ask Google or Jest (https://jestjs.io/docs) what you should do 
 */
const sum = require('./sum');


test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});


test('adds 1 + 2 to equal 3', () => {
  //arrange: 
  const input1 = 1;
  const input2 = 2;
  const shouldValue = 3; //1+2 =3

  //act: 
  const isValue = sum(input1, input2);

  //assert
  expect(isValue).toBe(shouldValue);
});