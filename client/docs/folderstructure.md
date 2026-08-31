## Project Folder structure 

```
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── register/
│   │       └── page.tsx
│   │
│   ├── dashboard/
│   │   └── page.tsx
│   │
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/s
│   ├── ui/
│   ├── forms/
│   ├── layout/
│   └── common/
│
├── hooks/
│   ├── useAuth.ts
│   └── useDebounce.ts
│
├── services/
│   ├── auth.service.ts
│   └── user.service.ts
│
├── api/
│   └── axios.ts
│
├── utils/
│   ├── cn.ts
│   ├── formatDate.ts
│   └── constants.ts
│
├── types/
│   ├── auth.ts
│   └── user.ts
│
├── lib/
│   └── ...
│
├── public/
│
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── tsconfig.json
└── README.md
```