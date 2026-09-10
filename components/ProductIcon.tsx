import type { SVGProps } from "react";
import {
  MusicIcon,
  FilmIcon,
  DiscordIcon,
  GamepadIcon,
  SparkleIcon,
  StarIcon,
  DumbbellIcon,
  VpnIcon,
  ServerIcon,
  BookIcon,
  PlayIcon,
} from "@/components/icons";

const ICON_MAP: Record<string, (props: SVGProps<SVGSVGElement>) => JSX.Element> = {
  music: MusicIcon,
  film: FilmIcon,
  discord: DiscordIcon,
  gamepad: GamepadIcon,
  sparkle: SparkleIcon,
  star: StarIcon,
  dumbbell: DumbbellIcon,
  vpn: VpnIcon,
  server: ServerIcon,
  book: BookIcon,
  play: PlayIcon,
};

export function ProductIcon({ name, ...props }: { name: string } & SVGProps<SVGSVGElement>) {
  const Icon = ICON_MAP[name] ?? SparkleIcon;
  return <Icon {...props} />;
}
