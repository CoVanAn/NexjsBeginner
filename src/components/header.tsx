'use client'
import { ModeToggle } from "@/components/custom/strickmode";
import Link from "next/link";

export default function Header() {
    return (
      <>
        <ul>
            <li>
                <ModeToggle />
            </li>
            <li>
                <Link href="/login">Login</Link>
            </li>
            <li>
                <Link href="/register">Register</Link>
            </li>
        </ul>
      </>
    );
  }
  