import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { OrganizationMember } from '@/lib/types'

// Komponen untuk menampilkan satu anggota organisasi
const OrganizationMemberCard: React.FC<OrganizationMember> = ({ name, position, imageUrl }) => (
    <Card className="flex flex-col items-center text-center">
        <CardHeader>
            <Avatar className="h-24 w-24">
                <AvatarImage src={imageUrl} alt={name} />
                <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
        </CardHeader>
        <CardContent>
            <CardTitle className="mb-2">{name}</CardTitle>
            <p className="text-sm text-muted-foreground">{position}</p>
        </CardContent>
    </Card>
)

export default OrganizationMemberCard;
