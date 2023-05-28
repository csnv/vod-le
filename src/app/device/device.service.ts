import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Device } from './device.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  /* Device API endpoint */
  private DEVICES_ENDPOINT = '/devices';
  /* List of Device elements */
  private devices: Device[] = [];
  /* Subject for ngrx style data consumption */
  private devicesSub = new BehaviorSubject<Device[]>(this.devices);
  /* Query industry Id */
  queryIndustry = new BehaviorSubject<number | undefined>(undefined);

  constructor(
    private httpClient: HttpClient
  ) {
    this.fetch();
  }

  /**
   * Retrieve data on initialization
   */
  private fetch(): void {
    this.fetchDevices().subscribe((response) => {
      this.devices = response as Device[];
      this.devicesSub.next([...this.devices]);
    });
  }

  /**
   * Fetch list of devices
   * @returns List of devices
   */
  private fetchDevices() {
    return this.httpClient.get(environment.api + this.DEVICES_ENDPOINT);
  }

  /**
   * Retrieves subject of the current list of devices
   */
  public getDevices() {
    return this.devicesSub;
  }

  /**
   * Clones the desired Device element and replaces it in the Device stack
   * @param device Device item
   */
  public updateDevice(device: Device) {
    const clone = { ...device };
    const index = this.devices.findIndex(_device => _device.id === clone.id);
    
    this.httpClient.put(environment.api + this.DEVICES_ENDPOINT + `/${device.id}`, {
      ...clone
    }).subscribe(() => {
      this.devices[index] = clone;
      this.propagate();
    });
  }

  /**
   * Removes an device from backend
   * @param device Device item
   */
  public removeDevice(device: Device) {
    this.httpClient.delete(environment.api + this.DEVICES_ENDPOINT + `/${device.id}`)
      .subscribe(() => {
        this.devices = this.devices.filter(item => item.id !== device.id);
        this.propagate();
      });
  }

  /**
   * Pushes a new device to backend
   * @param item Device data
   */
  public addDevice(item: Partial<Device>) {
    // Service call
    this.httpClient.post(
      environment.api + this.DEVICES_ENDPOINT,
      { ...item }
    ).subscribe((response: any) => {
      // Local reflection and propagation
      this.devices.push({ ...response });
      this.propagate();
    });
  }

  /**
   * Propagate copy of devices list through subject
   */
  public propagate() {
    this.devicesSub.next([ ...this.devices ]);
  }
}