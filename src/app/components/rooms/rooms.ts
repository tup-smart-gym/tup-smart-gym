import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Room {
  id: number;
  name: string;
}

@Component({
  selector: 'app-rooms',
  imports: [CommonModule, FormsModule],
  templateUrl: './rooms.html',
  styleUrl: './rooms.css'
})
export class RoomsComponent {

  rooms: Room[] = [];
  filteredRooms: Room[] = [];
  filterText: string = '';

  showAddModal: boolean = false;
  showEditModal: boolean = false;

  newRoomName: string = '';
  editingRoom: Room | null = null;
  editingName: string = '';

  private nextId: number = 1;

  applyFilter(): void {
    const search = this.filterText.toLowerCase().trim();
    this.filteredRooms = search
      ? this.rooms.filter(r => r.name.toLowerCase().includes(search))
      : [...this.rooms];
  }

  openAddModal(): void {
    this.newRoomName = '';
    this.showAddModal = true;
  }

  confirmAdd(): void {
    if (this.newRoomName.trim()) {
      const room: Room = { id: this.nextId++, name: this.newRoomName.trim() };
      this.rooms.push(room);
      this.applyFilter();
      this.showAddModal = false;
    }
  }

  cancelAdd(): void {
    this.showAddModal = false;
  }

  openEditModal(room: Room): void {
    this.editingRoom = room;
    this.editingName = room.name;
    this.showEditModal = true;
  }

  confirmEdit(): void {
    if (this.editingRoom && this.editingName.trim()) {
      this.editingRoom.name = this.editingName.trim();
      this.applyFilter();
      this.showEditModal = false;
    }
  }

  cancelEdit(): void {
    this.showEditModal = false;
  }

  deleteRoom(id: number): void {
    this.rooms = this.rooms.filter(r => r.id !== id);
    this.applyFilter();
  }
}