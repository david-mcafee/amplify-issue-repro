'use client';

import { Amplify } from 'aws-amplify';
import config from '@/amplifyconfiguration.json';

Amplify.configure(config as any, { ssr: true });

export default function ConfigureAmplifyClientSide() {
    return null;
}