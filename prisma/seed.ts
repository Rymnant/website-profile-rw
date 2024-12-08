import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.admin.create({
    data: {
      email: 'admin@example.com',
      name: 'rymnant',
      password: '1234',
    },
  });

  await prisma.newsArticle.create({
    data: {
      title: 'First News Article',
      description: 'This is the description of the first news article.',
      category: 'General',
      author: 'Author Name',
      date: new Date(),
      link: 'https://example.com/news/1',
      imageUrl: 'https://example.com/image.jpg',
    },
  });

  await prisma.organizationMember.create({
    data: {
      name: 'John Doe',
      position: 'President',
      imageUrl: 'https://example.com/johndoe.jpg',
    },
  });

  const umkmItem = await prisma.uMKMItem.create({
    data: {
      title: 'UMKM Item 1',
    },
  });

  await prisma.uMKM.create({
    data: {
      label: 'UMKM 1',
      category: 'Category 1',
      description: 'Description for UMKM 1',
      umkmItemId: umkmItem.id,
      link: 'https://example.com/umkm1',
      imageUrl: 'https://example.com/umkm1.jpg',
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
