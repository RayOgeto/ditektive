// storyEngine.js
import alexStory from "../screens/messages/stories/alex.json";

const stories = {
  alex: alexStory
};

export function getStory(contactId) {
  return stories[contactId];
}

export function getStartNodeId(contactId) {
  const s = getStory(contactId);
  return s.start;
}

export function getNode(contactId, id) {
  const s = getStory(contactId);
  return s.nodes.find(n => n.id === id);
}

// Optional scaffolding for conditions/effects later:
export function isChoiceAvailable(choice, flags) {
  if (!choice.conditions) return true;
  return choice.conditions.every(cond => !!flags[cond]);
}

export function applyEffects(effects, flags) {
  if (!effects) return flags;
  const next = { ...flags };
  for (const [k, v] of Object.entries(effects)) next[k] = v;
  return next;
}
