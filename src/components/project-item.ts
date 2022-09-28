import { Draggable } from "../models/drag-drop.js";
import Component from "./base-component.js";
import { autobind as Autobind } from "../decorators/autobind.js";
import { Project } from "../models/project.js";

// Project Item Class
export class ProjectItem
  extends Component<HTMLUListElement, HTMLLIElement>
  implements Draggable
{
  private project: Project;

  get persons() {
    if (this.project.people > 1) {
      return `${this.project.people} people`;
    }

    return "1 person";
  }

  constructor(hostId: string, project: Project) {
    super("single-project", hostId, true, project.id);

    this.project = project;
    this.configure();
    this.renderContent();
  }

  @Autobind
  dragStartHandler(event: DragEvent): void {
    event.dataTransfer!.setData("text/plain", this.project.id);
    event.dataTransfer!.effectAllowed = "move";
  }

  dragEndHandler(event: DragEvent): void {
    console.log("dragEndHandler", event);
  }

  configure() {
    this.element.addEventListener("dragstart", this.dragStartHandler);
    this.element.addEventListener("dragend", this.dragEndHandler);
  }

  renderContent() {
    this.element.querySelector("h2")!.textContent = this.project.title;
    this.element.querySelector("h3")!.textContent = this.persons;
    this.element.querySelector("p")!.textContent = this.project.description;
  }
}
