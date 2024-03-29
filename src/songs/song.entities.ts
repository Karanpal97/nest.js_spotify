import { Playlist } from 'src/playlist/playlist.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('songs')
export class Song {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('varchar', { array: true })
  artists: string[];

  @Column('date')
  releasedDate: Date;

  @Column('time')
  duration: Date;

  @Column('text')
  lyrics: string;

  @OneToMany(() => Playlist, (playlist) => playlist.songs)
  playlist: Playlist;
}
