import { Injectable } from '@angular/core';
import { Member } from '../user/user';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly CACHE_KEY = 'gym_members';
  private readonly TTL = 5 * 60 * 1000; // 5 minutos en milisegundos

  set(data: Member[]): void {
    const payload = {
      data,
      timestamp: Date.now(),
    };
    localStorage.setItem(this.CACHE_KEY, JSON.stringify(payload));
  }

  get(): Member[] {
    const item = localStorage.getItem(this.CACHE_KEY);
    return item ? JSON.parse(item).data : [];
  }

  isValid(): boolean {
    const item = localStorage.getItem(this.CACHE_KEY);
    if (!item) return false;

    try {
      const parsed = JSON.parse(item);
      return Date.now() - parsed.timestamp < this.TTL;
    } catch {
      return false;
    }
  }

  clear(): void {
    localStorage.removeItem(this.CACHE_KEY);
  }
}
