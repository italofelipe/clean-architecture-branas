import Level from "./Level";
import LevelRepository from "./LevelRepository";

export default class LevelRepositoryMemory implements LevelRepository {
	levels: Level[];
    
	constructor () {
		this.levels = [
			new Level({
				code: "EF1",
				description: "Ensino Fundamental I"
			}),
			new Level({
				code: "EF2",
				description: "Ensino Fundamental II"
			}),
			new Level({
				code: "EM",
				description: "Ensino Médio"
			})
		];
	}

	findByCode(code: string) {
		const level = this.levels.find(level => level.code === code);
		if (!level) throw new Error("Level not found");
		return level;
	}
}
