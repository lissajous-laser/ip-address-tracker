import {expect, test} from '@jest/globals';
import {domainNameRe} from "../resources/constants";

test('Domain name with protocol is false', () => {
  expect(domainNameRe.test('https://www.youtube.com')).toEqual(false);
})

test('Domain name without protocol is true', () => {
  expect(domainNameRe.test('www.youtube.com')).toEqual(true);
})

test('Domain name with protocol is false', () => {
  expect(domainNameRe.test('www.youtube.com/watch?v=some_vid'))
    .toEqual(false);
})

test('Domain name without www is true', () => {
  expect(domainNameRe.test('rgb.to')).toEqual(true);
})

test('Domain name with path is false', () => {
  expect(domainNameRe.test('https://rgb.to/ral/page/1')).toEqual(false);
});

test('Domain name with sub-domain is true', () => {
  expect(domainNameRe.test('api.github.com')).toEqual(true);
})

