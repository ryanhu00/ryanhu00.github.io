import pfp from '../assets/pfp.png';
import python from '../assets/logos/Python_logo.png';
import java from '../assets/logos/Java_logo.png';
import c from '../assets/logos/C_logo.png';
import javascript from '../assets/logos/Javascript_logo.png';
import cpp from '../assets/logos/C++_logo.png';
import typescript from '../assets/logos/Typescript_logo.png';
import css from '../assets/logos/CSS3_logo.png';
import html from '../assets/logos/HTML5_logo.png';
import latex from '../assets/logos/latex_logo.png';
import ocaml from '../assets/logos/OCaml_logo.png';
import git from '../assets/logos/git_logo.png';
import vscode from '../assets/logos/VScode_logo.png';
import linux from '../assets/logos/linux_logo.png';
import aws from '../assets/logos/aws_logo.png';
import docker from '../assets/logos/docker_logo.png';
import kubernetes from '../assets/logos/kubernetes_logo.png';
import figma from '../assets/logos/figma_logo.png';
import pytorch from '../assets/logos/pytorch_logo.png';
import opencv from '../assets/logos/opencv_logo.png';
import numpy from '../assets/logos/numpy_logo.png';
import scikit from '../assets/logos/scikit-learn_logo.png';
import plotly from '../assets/logos/plotly_logo.png';
import react from '../assets/logos/react_logo.png';
import node from '../assets/logos/nodejs_logo.png';
import keras from '../assets/logos/keras_logo.png';
import tensorflow from '../assets/logos/tensorflow_logo.png';
import tailwind from '../assets/logos/tailwind_logo.png';
import runningdogvideo from '../assets/project_images/running_dog_demo.mp4';
import visualanemometry from '../assets/project_images/visual_anemometry.png';
import stocktrading from '../assets/project_images/stock_trading.jpg';
import aginghiv from '../assets/project_images/aging_hiv.jpg';
import tinylm from '../assets/project_images/tinylm.png';
import nammopf from '../assets/project_images/namm_opf.png';
import voxelrasterizer from '../assets/project_images/voxel_rasterizer_sphere_orbit.mp4';

export const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
] as const;

export const socialLinks = [
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/ryanhu00',
    icon: 'github' as const,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/ryanrhu00',
    icon: 'linkedin' as const,
  },
  {
    id: 'email',
    label: 'Email',
    href: 'mailto:ryanrhu00@gmail.com',
    icon: 'email' as const,
  },
  {
    id: 'x',
    label: 'X',
    href: 'https://x.com/ryanrhu00',
    icon: 'x' as const,
  },
];

export const about = {
  headline: ["Hi! I'm Ryan!"],
  supporting:
    "Currently studying @ Caltech, pursuing a BS in CS. Focused on engineering, AI/ML, and general problem-solving. Equally passionate about basketball, music, and philosophy.",
  caltechHighlight: 'Caltech',
  pfp,
  resume: {
    updated: 'Sep 2026',
    href: '/Ryan_Hu_Resume.pdf',
  },
};

export type TechItem = { name: string; icon: string };

export const techData: {
  languages: TechItem[];
  tools: TechItem[];
  frameworks: TechItem[];
} = {
  languages: [
    { name: 'Python', icon: python },
    { name: 'Java', icon: java },
    { name: 'C', icon: c },
    { name: 'JavaScript', icon: javascript },
    { name: 'C++', icon: cpp },
    { name: 'TypeScript', icon: typescript },
    { name: 'CSS3', icon: css },
    { name: 'HTML5', icon: html },
    { name: 'LaTeX', icon: latex },
    { name: 'OCaml', icon: ocaml },
  ],
  tools: [
    { name: 'Git', icon: git },
    { name: 'VS Code', icon: vscode },
    { name: 'Linux', icon: linux },
    { name: 'AWS', icon: aws },
    { name: 'Docker', icon: docker },
    { name: 'Kubernetes', icon: kubernetes },
    { name: 'Figma', icon: figma },
  ],
  frameworks: [
    { name: 'Pytorch', icon: pytorch },
    { name: 'OpenCV', icon: opencv },
    { name: 'NumPy', icon: numpy },
    { name: 'Scikit-learn', icon: scikit },
    { name: 'Plotly', icon: plotly },
    { name: 'React.js', icon: react },
    { name: 'Node.js', icon: node },
    { name: 'Keras', icon: keras },
    { name: 'TensorFlow', icon: tensorflow },
    { name: 'Tailwind', icon: tailwind },
  ],
};

export const leadership = [
  { title: 'Caltech Senior Class Co-President', date: 'Jun 2026 – Present' },
  { title: "Hacktech Organizer - Caltech's Hackathon", date: 'Dec 2025 – Present' },
  { title: "NCAA Division III Men's Basketball", date: 'Sep 2023 – Mar 2025' },
  { title: 'SCIAC All-Academic Team', date: 'Awarded 2024, 2025' },
  { title: 'Caltech Summer Undergraduate Research Fellowship (SURF)', date: 'Awarded 2024' },
];

export const workExperience = [
  {
    title: 'Rox - Foundations Engineer Intern',
    date: 'September 2026 - December 2026',
    description: 'Incoming Fall 2026. Working on Agents.',
  },
  {
    title: 'Amazon - Software Development Engineer Intern',
    date: 'June 2026 - September 2026',
    description: 'Optimized a workflow orchestration pipeline by migrating existing service to an asynchronous architecture. Built a scalable data export pipeline, supplying data to downstream teams for model training and improvement.',
  },
  {
    title: 'Caltech Wierman Lab - Machine Learning Researcher',
    date: 'April 2026 - Present',
    description:
      'Researching diffusion-based approaches for constrained optimal power flow in energy system contexts.',
  },
  {
    title: 'Caltech Alvarez Lab - Machine Learning Researcher',
    date: 'February 2025 - Present',
    description:
      'Collaborating with Activision to develop methods for toxic, anomalous, and outlier player behavior detection in competitive action games. Utilizing auto-encoders, feature subspaces, and clustering techniques to build a robust machine learning framework for detecting and addressing unusual player behavior.',
  },
  {
    title: 'Caltech - Teaching Assistant for CS/CNS/EE 155',
    date: 'January 2026 - March 2026',
    description:
      'Office hours tailored toward teaching machine learning and data mining concepts, focusing on probabilistic modeling, optimization techniques, and practical implementation of ML algorithms.',
  },
  {
    title: 'Tracevision - Math Team Machine Learning Intern',
    date: 'April 2025 - September 2025',
    description:
      'Working in the Math Team on basketball shot event detection using raw full-game footage. Developing preprocessing scripts to extract focused shot sequences. Deploying hybrid CNN + Transformer model for accurate classification of shot outcomes from annotated clips.',
  },
  {
    title: 'Tracevision - Math Team Software Engineer Intern',
    date: 'April 2025 - September 2025',
    description:
      'Working in the Math Team on geospatial API development and production tool infrastructure. Developing scripts and pipelines to process and integrate location data for proofs-of-concept and real-world deployment in security and retail sectors.',
  },
  {
    title: 'Caltech - Teaching Assistant for CS21',
    date: 'January 2025 - March 2025',
    description:
      'Office hours tailored towards teaching computer science proof-writing for algorithms, focusing on problem-solving techniques, formal logic, and complexity analysis.',
  },
  {
    title: 'Caltech Alvarez Lab - Undergraduate Researcher',
    date: 'April 2024 - December 2024',
    description:
      'Investigated the role of climate change, air pollution, and epigenetics in the aging of people with HIV in collaboration with UCLA. Employed multiple causal machine learning models to analyze relationships between various sociodemographic, climate, and air quality factors with different measures of aging.',
  },
  {
    title: 'Caltech GALCIT Lab - Undergraduate Researcher',
    date: 'June 2023 - September 2023',
    description:
      'Developed a novel visual anemometry technique for estimating wind speeds from video footage of trees and vegetation. Implemented computer vision algorithms and deep learning models to track motion patterns and correlate them with wind speed measurements.',
  },
];

export type ProjectLink = { label: string; href: string };

export type Project = {
  id: string;
  title: string;
  description: string;
  media: { type: 'image' | 'video'; src: string; alt?: string; playbackRate?: number; objectPosition?: string };
  links: ProjectLink[];
};

export const projects: Project[] = [
  {
    id: 'project-7',
    title: 'Voxel Rasterizer',
    description:
      'GPU-accelerated voxel reconstruction and rendering pipeline built with CUDA. Reconstructs 3D scenes from multi-view images using shape-from-silhouette techniques and renders novel viewpoints through real-time ray marching.',
    media: { type: 'video', src: voxelrasterizer, playbackRate: 0.5 },
    links: [{ label: 'Code', href: 'https://github.com/ryanhu00/voxel-rasterizer' }],
  },
  {
    id: 'project-6',
    title: 'Neural Approximate Mirror Maps for DC-OPF',
    description:
      'Geometry-aware diffusion framework for DC Optimal Power Flow (OPF) in electric power grids. Uses learned latent representations to generate feasible generator dispatch solutions while respecting physical and operational constraints.',
    media: { type: 'image', src: nammopf, alt: 'NAMM OPF' },
    links: [
      { label: 'Project', href: '/namm_opf.pdf' },
      { label: 'Code', href: 'https://github.com/ryanhu00/namm-opf' },
    ],
  },
  {
    id: 'project-5',
    title: 'TinyLM',
    description: 'Transformer language model coded from scratch, trained on TinyStories dataset.',
    media: { type: 'image', src: tinylm, alt: 'Transformer Language Model', objectPosition: 'left center' },
    links: [{ label: 'Code', href: 'https://github.com/ryanhu00/tinylm' }],
  },
  {
    id: 'project-1',
    title: 'Agentic Stock Trader',
    description:
      'Multi-agent financial reasoning framework that uses Large Language Models (LLMs) to make short-term stock trading decisions. Agents dynamically ingest, debate, and reason over financial data to output explainable decisions.',
    media: { type: 'image', src: stocktrading, alt: 'Agentic Stock Trader' },
    links: [
      { label: 'Project', href: '/multi_agent_debate.pdf' },
      { label: 'Code', href: 'https://github.com/Z4KH/brainrot' },
    ],
  },
  {
    id: 'project-2',
    title: 'Impact of Socioeconomic Factors on HIV Aging (Manuscript in Submission)',
    description:
      'Applying machine learning techniques to analyze the impact of traditional epigenetic factors in addition to socioeconomic factors, such as air quality and temperature, on the aging of people with HIV.',
    media: { type: 'image', src: aginghiv, alt: 'Aging in people with HIV' },
    links: [],
  },
  {
    id: 'project-3',
    title: 'Running Dog',
    description:
      'Google Dino Run-inspired endless runner game featuring obstacles, power-ups, and progressive difficulty scaling. Written from scratch entirely in C.',
    media: { type: 'video', src: runningdogvideo },
    links: [
      { label: 'Demo', href: 'https://ryanhu00.github.io/RD/' },
      { label: 'Code', href: 'https://github.com/ryanhu00/Running-Dog' },
    ],
  },
  {
    id: 'project-4',
    title: 'Visual Anemometry',
    description:
      'Investigating novel visual anemometry techniques for estimating wind speeds from video footage of trees and vegetation.',
    media: { type: 'image', src: visualanemometry, alt: 'Visual Anemometry' },
    links: [
      { label: 'Project', href: '/Estimating_Wind_Speeds_with_Visual_Anemometry.pdf' },
      { label: 'Code', href: 'https://github.com/ryanhu00/Visual-Anemometry' },
    ],
  },
];

export const footer = {
  copyright: '© 2026 Ryan R. Hu.',
};
