# E-Commerce Web Application

A responsive E-Commerce web app built with **React 19**, **Vite**, and **Vanilla CSS**. Users can browse products, search, filter, view detailed product information, and manage a shopping cart. Product data is fetched from the DummyJSON API.

## Features

- Product listing with pagination
- Search and category filtering
- Product detail pages
- Responsive design
- Loading and error handling

## Assumptions

* Product data is fetched from DummyJSON API.
* API responses are assumed to be available and consistent.

## Architectural Decisions

* **Context API** for lightweight global state management.
* **Component-based architecture** for reusability and maintainability.
* **Custom Hooks** to separate business logic from UI.
* **Axios** for API requests and error handling.
* **React Router DOM** for client-side routing.
* **Vanilla CSS** for styling with minimal dependencies.

### Features
### Performance
* Lazy loading images
* API caching
* Code splitting
* Skeleton loaders

### Code Quality

* Error boundaries
* Centralized API layer

## Tech Stack

* React 19
* Vite
* React Router DOM v7
* Axios
* Context API
* Vanilla CSS


## Installation

```bash or cmd or git
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open:

```text
http://localhost:5173
```

## Build for Production

```bash
pnpm build
pnpm preview
```

## Project Structure

```text
src/
├── api/
├── components/
├── context/
├── hooks/
├── pages/
├── routes/
├── styles/
├── App.jsx
└── main.jsx
```

## API

Data is fetched from:

[DummyJSON API](https://dummyjson.com?utm_source=chatgpt.com)

## License

This project is for learning and task purposes.
