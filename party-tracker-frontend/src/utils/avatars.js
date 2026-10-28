// Importujemy pliki graficzne z folderu assets
import batImg from '../assets/bat.png';
import draculaImg from '../assets/dracula.png';
import ghostImg from '../assets/ghost.png';
import pumpkinImg from '../assets/pumpkin.png';
import skeletonImg from '../assets/skeleton.png';
import werewolfImg from '../assets/werewolf.png';
import wizardImg from '../assets/wizard.png';
import zombieImg from '../assets/zombie.png';

export const avatarMap = {
    bat: batImg,
    dracula: draculaImg,
    ghost: ghostImg,
    pumpkin: pumpkinImg,
    skeleton: skeletonImg,
    werewolf: werewolfImg,
    wizard: wizardImg,
    zombie: zombieImg
};

export function getAvatarImage(avatarCode) {
    return avatarMap[avatarCode] || pumpkinImg;
}