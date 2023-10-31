import { Schema } from '@/amplify/data/resource'
import { generateServerClient } from '@aws-amplify/adapter-nextjs'
import { cookies } from 'next/headers'

export const client = generateServerClient<Schema>({ cookies })