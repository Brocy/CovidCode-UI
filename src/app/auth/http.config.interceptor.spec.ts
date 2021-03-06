import {TestBed} from '@angular/core/testing';
import {HttpConfigInterceptor} from './http.config.interceptor';
import {OidcSecurityService} from 'angular-auth-oidc-client';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HTTP_INTERCEPTORS, HttpClient, HttpRequest, HttpResponse} from '@angular/common/http';

describe('HttpConfigInterceptor', () => {
	let interceptor: HttpConfigInterceptor;
	let httpMock: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [
				{
					provide: HTTP_INTERCEPTORS,
					useClass: HttpConfigInterceptor,
					multi: true
				},
				HttpConfigInterceptor,
				{provide: OidcSecurityService, useValue: {getToken: () => 'token'}}
			]
		}).compileComponents();
		interceptor = TestBed.inject(HttpConfigInterceptor);
		httpMock = TestBed.inject(HttpTestingController);
	});

	it('should be created', () => {
		expect(interceptor).toBeTruthy();
	});

	describe('intercept', () => {
		it('should add Authorization to Headers if pattern is matching', () => {
			const response = configTest('/v1/authcode');
			expect(response.headers.get('Authorization')).toEqual('Bearer token');
		});
		it('should not add Authorization to Headers if pattern is not matching', () => {
			const response = configTest('/api');
			expect(response.headers.has('Authorization')).toBe(false);
		});
		it("should not add Authorization to Headers if there's no token", () => {
			const auth = TestBed.inject(OidcSecurityService);
			jest.spyOn(auth, 'getToken').mockReturnValue('');
			const response = configTest('/v1/authcode');
			expect(response.headers.has('Authorization')).toBe(false);
		});

		function configTest(url: string): HttpResponse<any> {
			let response: HttpResponse<any>;
			const request = new HttpRequest<any>('GET', url);
			const next: any = {
				handle: responseHandle => {
					response = responseHandle;
				}
			};
			interceptor.intercept(request, next);
			return response;
		}
	});

	afterEach(() => {
		httpMock.verify();
	});
});
