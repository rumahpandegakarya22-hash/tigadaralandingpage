import { Container } from "./container";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";
import { RoomCard } from "./room-card";
import { RoomCompareProvider } from "./room-compare";
import type { RoomType, Property } from "@/lib/types";
import type { LandingCopy } from "@/lib/copy";

export function Rooms({ rooms, property, copy }: { rooms: RoomType[]; property: Property; copy: LandingCopy }) {
  return (
    <section id="kamar" className="bg-surface-soft/40 py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow={copy.rooms_eyebrow}
          title={copy.rooms_title}
          description={copy.rooms_desc}
        />

        <RoomCompareProvider rooms={rooms} property={property} copy={copy}>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rooms.map((room, index) => (
              <Reveal key={room.id} delay={index * 0.08}>
                <RoomCard room={room} property={property} ctaLabel={copy.rooms_card_cta} />
              </Reveal>
            ))}
          </div>
        </RoomCompareProvider>
      </Container>
    </section>
  );
}
