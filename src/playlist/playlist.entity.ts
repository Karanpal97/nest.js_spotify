import { Song } from 'src/songs/song.entities';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

@Entity('Playlist')
export class Playlist {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;

  @ManyToMany(() => Song, (song) => song.playlist)
  songs: Song[];
}
