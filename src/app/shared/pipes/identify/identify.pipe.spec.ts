import { IdentifyPipe } from './identify.pipe';

describe('IdentifyPipe', () => {
  const pipe = new IdentifyPipe();
  const list = [
    { id: 0, name: 'Abc'},
    { id: 1, name: 'Def'},
    { id: 2, name: 'Cef'},
  ];

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('returns name', () => {
    const first = list[0];
    const name = pipe.transform(first.id, list, 'id', 'name');

    expect(name).toBe(first.name);
  })

  it('returns empty string on empty list', () => {
    const first = list[0];
    const name = pipe.transform(first.id, [], 'id', 'name');
    expect(name).toBe('');
  });

  it('returns empty string on unknown id', () => {
    const fakeId = 55;
    const name = pipe.transform(fakeId, list, 'id', 'name');
    
    expect(name).toBe('');
  })
});
