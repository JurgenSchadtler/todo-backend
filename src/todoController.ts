import { Request, Response } from "express";
import { supabase } from "./supabaseClient";

export const getTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    const { data, error } = await supabase.from("todos").select("*");
    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { title, completed } = req.body;
  const { data, error } = await supabase
    .from("todos")
    .insert([{ title, completed }]);
  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }
  res.status(201).json(data);
};

export const updateTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { title, completed } = req.body;
  const { data, error } = await supabase
    .from("todos")
    .update({ title, completed })
    .eq("id", id);
  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }
  res.status(200).json(data);
};

export const deleteTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { data, error } = await supabase.from("todos").delete().eq("id", id);
  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }
  res.status(204).send();
};
