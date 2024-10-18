# Pokémon Listing App

This project is a simple Pokémon listing page built using React and the PokéAPI. It allows users to view a list of Pokémon, search for specific Pokémon with a debounce functionality, and filter them by type. The project is styled using Tailwind CSS (or plain CSS if preferred).

## Features

- **Pokémon List**: Fetches and displays Pokémon data from the PokéAPI.
- **Search**: Allows users to search for Pokémon by name, with debounce functionality to optimize performance.
- **Filter by Type**: Users can filter the Pokémon by type (e.g., Fire, Water, Grass, etc.).
- **Responsive Design**: The app is responsive and works well on all screen sizes.

## Technologies Used

- **React.js**: Frontend framework used to build the application.
- **PokéAPI**: API used to fetch Pokémon data.
- **Tailwind CSS**: For styling (you can also use plain CSS if preferred).
- **Custom Debounce Hook**: For handling search input efficiently.

## How to Run the Project

### Prerequisites

- **Node.js** and **npm** installed on your machine.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/T1A0R3S2H/Pokedex-Assignment.git
   ```

2. Navigate to the project directory:

   ```bash
   cd Pokedex-Assignment
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

### Running the Application

To run the app locally:

```bash
npm start
```

This will start the app on `http://localhost:3000`.

### Build for Production

To build the project for production:

```bash
npm run build
```

The optimized output will be generated in the `build` folder.

## Future Improvements

- Add pagination for the Pokémon list.
- Improve filter functionality with more Pokémon attributes (like abilities, height, weight).
- Enhance the UI with more detailed Pokémon stats and abilities.

## License

This project is open-source and available under the [MIT License](LICENSE).

---

You can customize this further based on any specific details you'd like to highlight. Let me know if you need anything else!
