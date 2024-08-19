# How to run the project

### Download repo
```
git clone https://github.com/ivandda/loybits.git
cd loybits
```
### Make sure to have pnpm installed
[Instalation Instructions](https://pnpm.io/installation)

### Now we need to download the dependencies
```
cd frontend
pnpm install
```

### You will need the following Env variables defined
```
NEXT_PUBLIC_DEFAULT_CHAIN=aleph-zero-testnet

# For AI:
OPENAI_API_KEY=your_openai_api_key
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_INDEX=your_pinecone_index_name
```

### Run locally
```
pnpm run dev
```

