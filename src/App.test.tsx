import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

test("renders input and add button", () => {
  render(<App />);
  const inputElement = screen.getByPlaceholderText(/Enter movie title/i);
  const buttonElement = screen.getByText(/Add Movie/i);
  expect(inputElement).toBeInTheDocument();
  expect(buttonElement).toBeInTheDocument();
});

test("adds a new movie to the list", () => {
  render(<App />);
  const inputElement = screen.getByPlaceholderText(/Enter movie title/i);
  const buttonElement = screen.getByText(/Add Movie/i);

  fireEvent.change(inputElement, { target: { value: "Inception" } });
  fireEvent.click(buttonElement);

  const movieItem = screen.getByText(/Inception/i);
  expect(movieItem).toBeInTheDocument();
});

test("toggles movie watched status", () => {
  render(<App />);
  const inputElement = screen.getByPlaceholderText(/Enter movie title/i);
  const buttonElement = screen.getByText(/Add Movie/i);

  fireEvent.change(inputElement, { target: { value: "Inception" } });
  fireEvent.click(buttonElement);

  const checkboxes = screen.getAllByRole("checkbox");
  const checkbox = checkboxes[0]; // Взаимодействуем с первым чекбоксом

  fireEvent.click(checkbox);
  expect(checkbox).toBeChecked();
  fireEvent.click(checkbox);
  expect(checkbox).not.toBeChecked();
});
