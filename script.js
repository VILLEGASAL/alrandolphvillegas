function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

function toggleContent(button) {
  const projectDetails = button.closest('.project-details');
  const content = projectDetails.querySelector('.expandable-content');
  const isExpanded = content.classList.contains('expanded');
  
  content.classList.toggle('expanded');
  button.textContent = isExpanded ? 'Show More' : 'Show Less';
}
