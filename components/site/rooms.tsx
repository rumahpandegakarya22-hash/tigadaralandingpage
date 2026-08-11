import { Container } from "./container";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";
import { RoomCard } from "./room-card";
import type { RoomType, Property } from "@/lib/types";

export function Rooms({ rooms, property }: { rooms: RoomType[]; property: Property }) {
  return (
    <section id="kamar" className="bg-surface-soft/40 py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Kamar & Harga"
          title="Pilih Tipe Kamar Sesuai Kebutuhan"
          description="Semua harga transparan, sudah termasuk kebersihan area umum. Bandingkan spesifikasi tiap tipe sebelum menghubungi kami."
        />

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room, index) => (
            <Reveal key={room.id} delay={index * 0.08}>
              <RoomCard room={room} property={property} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
