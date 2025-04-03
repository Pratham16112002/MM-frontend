import axiosInstance from '@/api/axiosConfig';
import { axiosPrivate } from '@/api/axiosPrivateConfig';
import { AxiosInstance, AxiosRequestConfig } from 'axios';

export class HttpWrapper {
  private publicAxios: AxiosInstance;
  private privateAxios: AxiosInstance;

  constructor() {
    this.publicAxios = axiosInstance;
    this.privateAxios = axiosPrivate;
    this.POST.bind(this);
    this.GET.bind(this);
    this.POSTFormData.bind(this);
    this.PUT.bind(this);
    this.DELETE.bind(this);
  }

  private setConfig(
    timeoutMs: number,
    contentType: string,
  ): AxiosRequestConfig {
    const abortController = new AbortController();
    setTimeout(() => abortController.abort(), timeoutMs || 0);
    return {
      signal: abortController.signal,
      headers: {
        'Content-Type': contentType,
      },
    };
  }
  private getAxiosInstance(isPrivate: boolean): AxiosInstance {
    return isPrivate ? this.privateAxios : this.publicAxios;
  }

  public POST(isPrivate: boolean, url: string, body: any) {
    const config = this.setConfig(10000, 'application/json');
    return this.getAxiosInstance(isPrivate).post(url, body, config);
  }

  public GET(isPrivate: boolean, url: string) {
    const config = this.setConfig(5000, 'application/json');
    return this.getAxiosInstance(isPrivate).get(url, config);
  }

  public DELETE(isPrivate: boolean, url: string ) {
    const config = this.setConfig(10000, 'application/json');
    return this.getAxiosInstance(isPrivate).delete(url, config);
  }

  public PUT(isPrivate: boolean, url: string, body: any) {
    const config = this.setConfig(5000, 'application/json');
    return this.getAxiosInstance(isPrivate).post(url, body, config);
  }

  public POSTFormData(isPrivate: boolean, url: string, formData: any) {
    const config = this.setConfig(10000, 'multipart/form-data');
    return this.getAxiosInstance(isPrivate).post(url, formData, config);
  }
}

export const httpWrapper = new HttpWrapper();
