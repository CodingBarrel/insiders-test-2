'use client';

import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('@src/components/layout/Navbar'), {ssr: false})

export default Navbar;