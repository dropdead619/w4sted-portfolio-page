export function scrollToElement(id: string) {
    if (!id)
        return;
    const element = document.querySelector(id) as HTMLElement;

    if (element)
        element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
}