import { TestBed } from '@angular/core/testing';

import { SizePostService } from './size-post.service';

describe('SizePostService', () => {
  let service: SizePostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SizePostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
