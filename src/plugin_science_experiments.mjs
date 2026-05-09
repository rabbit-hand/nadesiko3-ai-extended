// PluginScienceExperiments - 科学実験プラグイン
const PluginScienceExperiments = {
    '初期化': {
        type: 'func',
        josi: [],
        pure: true,
        fn: function (sys) {
        }
    },
    // --- 基礎科学実験 ---
    '簡単実験リスト': {
        type: 'func',
        josi: [],
        pure: true,
        fn: function () {
            return [
                {
                    name: '水の浮力実験',
                    difficulty: '簡単',
                    age: '小学生',
                    materials: ['水', '卵', '塩', 'コップ'],
                    description: '塩水の浮力で卵を浮かせる実験'
                },
                {
                    name: '光の屈折実験',
                    difficulty: '簡単',
                    age: '小学生',
                    materials: ['コップ', '水', '鉛筆'],
                    description: '水の中の鉛筆が曲がって見える実験'
                },
                {
                    name: '静電気実験',
                    difficulty: '簡単',
                    age: '小学生',
                    materials: ['風船', '髪の毛', '小さな紙片'],
                    description: '摩擦で静電気を発生させる実験'
                },
                {
                    name: '色の混合実験',
                    difficulty: '簡単',
                    age: '小学生',
                    materials: ['絵の具', 'パレット', '筆'],
                    description: '3原色を混ぜて色を作る実験'
                },
                {
                    name: '植物の成長観察',
                    difficulty: '簡単',
                    age: '小学生',
                    materials: ['種', '土', '植木鉢', '水'],
                    description: '植物の成長過程を観察する実験'
                }
            ];
        }
    },
    '実験手順': {
        type: 'func',
        josi: [['の']],
        pure: true,
        fn: function (experimentName) {
            const procedures = {
                '水の浮力実験': [
                    'コップに水を半分入れる',
                    '卵をそっと水に入れる（沈むことを確認）',
                    '塩を大さじ3杯加えてよく混ぜる',
                    'もう一度卵をそっと入れる',
                    '卵が浮くことを観察する'
                ],
                '光の屈折実験': [
                    'コップに水を8分目まで入れる',
                    '鉛筆を斜めに水の中に入れる',
                    '横から鉛筆を見る',
                    '水の部分で鉛筆が曲がって見えることを確認する'
                ],
                '静電気実験': [
                    '風船を髪の毛にこすりつける',
                    '風船を小さな紙片に近づける',
                    '紙片が風船に引き寄せられることを観察する'
                ],
                '色の混合実験': [
                    '赤、青、黄の絵の具を準備する',
                    '赤と青を混ぜて紫色を作る',
                    '青と黄を混ぜて緑色を作る',
                    '赤と黄を混ぜて橙色を作る'
                ],
                '植物の成長観察': [
                    '植木鉢に土を入れる',
                    '種を土にまく',
                    '水を適量与える',
                    '毎日成長を観察し記録する',
                    '日光の当て方による違いを比較する'
                ]
            };
            return {
                experiment: experimentName,
                steps: procedures[experimentName] || ['実験手順が見つかりません'],
                safetyTips: [
                    '保護者の方と一緒に行う',
                    '安全な場所で実験する',
                    '使用後は片付ける'
                ]
            };
        }
    },
    // --- 物理実験 ---
    '物理実験リスト': {
        type: 'func',
        josi: [],
        pure: true,
        fn: function () {
            return [
                {
                    name: '振り子の運動',
                    difficulty: '中級',
                    age: '中学生',
                    materials: ['糸', 'おもり', 'スタンド', 'ストップウォッチ'],
                    description: '振り子の周期を測定する実験'
                },
                {
                    name: '光のスペクトル',
                    difficulty: '中級',
                    age: '中学生',
                    materials: ['プリズム', '懐中電灯', '白いスクリーン'],
                    description: '光を分解して虹を作る実験'
                },
                {
                    name: '電磁石の作成',
                    difficulty: '中級',
                    age: '中学生',
                    materials: ['釘', 'エナメル線', '乾電池', 'クリップ'],
                    description: '電流で磁石を作る実験'
                },
                {
                    name: '音速の測定',
                    difficulty: '上級',
                    age: '高校生',
                    materials: ['音波発生器', 'マイク', 'オシロスコープ'],
                    description: '音の速さを測定する実験'
                },
                {
                    name: '放射線の観測',
                    difficulty: '上級',
                    age: '高校生',
                    materials: ['GM管', '放射線測定器'],
                    description: '自然放射線を測定する実験'
                }
            ];
        }
    },
    '振り子計算': {
        type: 'func',
        josi: [['の'], ['で']],
        pure: true,
        fn: function (length, gravity = 9.8) {
            if (length <= 0)
                return { error: '長さは正の値が必要です' };
            // T = 2π√(L/g)
            const period = 2 * Math.PI * Math.sqrt(length / gravity);
            const frequency = 1 / period;
            return {
                length: length,
                gravity: gravity,
                period: period,
                frequency: frequency,
                formula: 'T = 2π√(L/g)',
                unit: '秒',
                timestamp: Date.now()
            };
        }
    },
    '光の屈折計算': {
        type: 'func',
        josi: [['で'], ['から'], ['に']],
        pure: true,
        fn: function (incidentAngle, n1, n2) {
            // スネルの法則: n1×sin(θ1) = n2×sin(θ2)
            const incidentRad = incidentAngle * Math.PI / 180;
            const sinRefracted = (n1 * Math.sin(incidentRad)) / n2;
            if (Math.abs(sinRefracted) > 1) {
                return { error: '全反射が発生します' };
            }
            const refractedRad = Math.asin(sinRefracted);
            const refractedAngle = refractedRad * 180 / Math.PI;
            return {
                incidentAngle: incidentAngle,
                refractedAngle: refractedAngle,
                n1: n1,
                n2: n2,
                criticalAngle: n2 > n1 ? Math.asin(n2 / n1) * 180 / Math.PI : null,
                formula: 'n1×sin(θ1) = n2×sin(θ2)',
                timestamp: Date.now()
            };
        }
    },
    // --- 化学実験 ---
    '化学実験リスト': {
        type: 'func',
        josi: [],
        pure: true,
        fn: function () {
            return [
                {
                    name: 'リトマス試験',
                    difficulty: '簡単',
                    age: '中学生',
                    materials: ['リトマス紙', 'レモン汁', '石鹸水', '炭酸水'],
                    description: '酸性・アルカリ性を判定する実験'
                },
                {
                    name: '結晶の生成',
                    difficulty: '中級',
                    age: '中学生',
                    materials: ['硫酸銅', '水', 'ビーカー', '糸'],
                    description: '美しい結晶を成長させる実験'
                },
                {
                    name: '中和反応',
                    difficulty: '中級',
                    age: '高校生',
                    materials: ['塩酸', '水酸化ナトリウム', 'フェノールフタレイン'],
                    description: '酸と塩基の中和を観察する実験'
                },
                {
                    name: '酸化還元反応',
                    difficulty: '上級',
                    age: '高校生',
                    materials: ['過マンガン酸カリウム', '硫酸鉄', '硫酸'],
                    description: '電子の移動を観察する実験'
                },
                {
                    name: '有機合成',
                    difficulty: '上級',
                    age: '大学生',
                    materials: ['エタノール', '酢酸', '硫酸'],
                    description: '酢酸エチルを合成する実験'
                }
            ];
        }
    },
    'pH計算': {
        type: 'func',
        josi: [['の']],
        pure: true,
        fn: function (hConcentration) {
            if (hConcentration <= 0)
                return { error: '水素イオン濃度は正の値が必要です' };
            const pH = -Math.log10(hConcentration);
            let nature = '';
            if (pH < 7)
                nature = '酸性';
            else if (pH === 7)
                nature = '中性';
            else
                nature = 'アルカリ性';
            return {
                hConcentration: hConcentration,
                pH: pH,
                nature: nature,
                formula: 'pH = -log10[H+]',
                timestamp: Date.now()
            };
        }
    },
    '化学反応シミュレーション': {
        type: 'func',
        josi: [['と'], ['を']],
        pure: true,
        fn: function (reactant1, reactant2) {
            const reactions = {
                'H2+O2': {
                    product: 'H2O',
                    reactionType: '化合',
                    balanced: '2H2 + O2 → 2H2O',
                    energy: '発熱',
                    description: '水素と酸素が反応して水が生成'
                },
                'Na+Cl2': {
                    product: 'NaCl',
                    reactionType: '化合',
                    balanced: '2Na + Cl2 → 2NaCl',
                    energy: '発熱',
                    description: 'ナトリウムと塩素が反応して塩化ナトリウムが生成'
                },
                'CH4+O2': {
                    product: 'CO2+H2O',
                    reactionType: '酸化',
                    balanced: 'CH4 + 2O2 → CO2 + 2H2O',
                    energy: '発熱',
                    description: 'メタンの燃焼反応'
                }
            };
            const key = `${reactant1}+${reactant2}`;
            const reaction = reactions[key];
            if (!reaction) {
                return {
                    reactants: [reactant1, reactant2],
                    reaction: '不明',
                    message: 'この反応はデータベースにありません'
                };
            }
            return {
                reactants: [reactant1, reactant2],
                reaction: reaction,
                timestamp: Date.now()
            };
        }
    },
    // --- 生物実験 ---
    '生物実験リスト': {
        type: 'func',
        josi: [],
        pure: true,
        fn: function () {
            return [
                {
                    name: 'ミクローム観察',
                    difficulty: '簡単',
                    age: '中学生',
                    materials: ['顕微鏡', 'スライドガラス', 'カバーガラス', '水'],
                    description: '微生物を観察する実験'
                },
                {
                    name: 'DNA抽出',
                    difficulty: '中級',
                    age: '高校生',
                    materials: ['バナナ', '食塩水', '洗剤', 'エタノール'],
                    description: '果物からDNAを抽出する実験'
                },
                {
                    name: '酵素反応',
                    difficulty: '中級',
                    age: '高校生',
                    materials: ['過酸化水素水', 'ジャガイモ', '試験管'],
                    description: '酵素の働きを観察する実験'
                },
                {
                    name: '細胞分裂観察',
                    difficulty: '上級',
                    age: '高校生',
                    materials: ['タマネギの根', '酢酸', '顕微鏡'],
                    description: '細胞分裂の過程を観察する実験'
                },
                {
                    name: 'PCR実験',
                    difficulty: '上級',
                    age: '大学生',
                    materials: ['DNAサンプル', 'Taqポリメラーゼ', 'プライマー'],
                    description: 'DNAを増幅する実験'
                }
            ];
        }
    },
    '細胞計算': {
        type: 'func',
        josi: [['を'], ['で']],
        pure: true,
        fn: function (initialCells, generations) {
            if (initialCells <= 0 || generations < 0) {
                return { error: '細胞数と世代数は正の値が必要です' };
            }
            // 細胞分裂: 1つの細胞が2つに分裂
            const finalCells = initialCells * Math.pow(2, generations);
            const totalCells = Array.from({ length: generations + 1 }, (_, i) => initialCells * Math.pow(2, i)).reduce((sum, cells) => sum + cells, 0);
            return {
                initialCells: initialCells,
                generations: generations,
                finalCells: finalCells,
                totalCells: totalCells,
                growthRate: Math.pow(2, generations),
                formula: 'N = N₀ × 2^g',
                timestamp: Date.now()
            };
        }
    },
    '遺伝子計算': {
        type: 'func',
        josi: [['と']],
        pure: true,
        fn: function (parent1, parent2) {
            // 簡単なメンデル遺伝（優性・劣性）
            const dominant = 'A';
            const recessive = 'a';
            const genotypes = [parent1, parent2];
            const gametes1 = genotypes[0].split('');
            const gametes2 = genotypes[1].split('');
            const offspring = [];
            for (const g1 of gametes1) {
                for (const g2 of gametes2) {
                    const genotype = [g1, g2].sort().join('');
                    const phenotype = genotype.includes(dominant) ? '優性形質' : '劣性形質';
                    offspring.push({ genotype, phenotype });
                }
            }
            const phenotypeCounts = offspring.reduce((counts, child) => {
                counts[child.phenotype] = (counts[child.phenotype] || 0) + 1;
                return counts;
            }, {});
            return {
                parents: [parent1, parent2],
                offspring: offspring,
                phenotypeCounts: phenotypeCounts,
                phenotypeRatios: {
                    dominant: phenotypeCounts['優性形質'] / offspring.length,
                    recessive: phenotypeCounts['劣性形質'] / offspring.length
                },
                timestamp: Date.now()
            };
        }
    },
    // --- 地学実験 ---
    '地学実験リスト': {
        type: 'func',
        josi: [],
        pure: true,
        fn: function () {
            return [
                {
                    name: '岩石の観察',
                    difficulty: '簡単',
                    age: '中学生',
                    materials: ['岩石サンプル', 'ルーペ', 'ハンマー'],
                    description: '様々な岩石の特徴を観察する実験'
                },
                {
                    name: '地層の作成',
                    difficulty: '中級',
                    age: '中学生',
                    materials: ['砂', '土', '小石', '透明容器'],
                    description: '地層の形成を模擬する実験'
                },
                {
                    name: '化石の作成',
                    difficulty: '中級',
                    age: '高校生',
                    materials: ['粘土', '貝殻', '石膏'],
                    description: '化石の形成過程を再現する実験'
                },
                {
                    name: '地震波シミュレーション',
                    difficulty: '上級',
                    age: '高校生',
                    materials: ['ゼリー', '振動発生器'],
                    description: '地震波の伝わり方を観察する実験'
                },
                {
                    name: '火山灰の分析',
                    difficulty: '上級',
                    age: '大学生',
                    materials: ['火山灰サンプル', '顕微鏡', '化学試薬'],
                    description: '火山灰の成分を分析する実験'
                }
            ];
        }
    },
    '地質年代計算': {
        type: 'func',
        josi: [['で'], ['を']],
        pure: true,
        fn: function (halfLife, remainingRatio) {
            if (halfLife <= 0 || remainingRatio <= 0 || remainingRatio > 1) {
                return { error: '半減期と残存率の値が不正です' };
            }
            // N/N₀ = (1/2)^(t/T₁/₂)
            const age = halfLife * Math.log(remainingRatio) / Math.log(0.5);
            return {
                halfLife: halfLife,
                remainingRatio: remainingRatio,
                age: Math.abs(age),
                formula: 't = T₁/₂ × log(N/N₀) / log(1/2)',
                timestamp: Date.now()
            };
        }
    },
    // --- 数学実験 ---
    '数学実験リスト': {
        type: 'func',
        josi: [],
        pure: true,
        fn: function () {
            return [
                {
                    name: '円周率の測定',
                    difficulty: '簡単',
                    age: '小学生',
                    materials: ['円形の物', '糸', '定規'],
                    description: '円周率を測定する実験'
                },
                {
                    name: '黄金比の発見',
                    difficulty: '中級',
                    age: '中学生',
                    materials: ['長方形', '定規', 'コンパス'],
                    description: '黄金比を探す実験'
                },
                {
                    name: 'フラクタル図形',
                    difficulty: '中級',
                    age: '高校生',
                    materials: ['紙', '定規', 'コンパス'],
                    description: 'フラクタル図形を描く実験'
                },
                {
                    name: 'モンテカルロ法',
                    difficulty: '上級',
                    age: '高校生',
                    materials: ['コンピュータ', '乱数'],
                    description: '乱数で円周率を計算する実験'
                },
                {
                    name: 'カオス理論',
                    difficulty: '上級',
                    age: '大学生',
                    materials: ['コンピュータ', '数式'],
                    description: 'カオス的な振る舞いを観察する実験'
                }
            ];
        }
    },
    '円周率計算': {
        type: 'func',
        josi: [['の'], ['を']],
        pure: true,
        fn: function (diameter, circumference) {
            if (diameter <= 0 || circumference <= 0) {
                return { error: '直径と円周は正の値が必要です' };
            }
            const pi = circumference / diameter;
            const error = Math.abs(pi - Math.PI);
            return {
                diameter: diameter,
                circumference: circumference,
                pi: pi,
                actualPi: Math.PI,
                error: error,
                accuracy: (1 - error / Math.PI) * 100,
                formula: 'π = C/d',
                timestamp: Date.now()
            };
        }
    },
    '黄金比計算': {
        type: 'func',
        josi: [['と']],
        pure: true,
        fn: function (longer, shorter) {
            if (longer <= 0 || shorter <= 0) {
                return { error: '長さは正の値が必要です' };
            }
            const ratio = longer / shorter;
            const goldenRatio = (1 + Math.sqrt(5)) / 2;
            const difference = Math.abs(ratio - goldenRatio);
            return {
                longer: longer,
                shorter: shorter,
                ratio: ratio,
                goldenRatio: goldenRatio,
                difference: difference,
                isGolden: difference < 0.01,
                formula: 'φ = (1 + √5) / 2 ≈ 1.618',
                timestamp: Date.now()
            };
        }
    },
    // --- 天文実験 ---
    '天文実験リスト': {
        type: 'func',
        josi: [],
        pure: true,
        fn: function () {
            return [
                {
                    name: '太陽の観測',
                    difficulty: '簡単',
                    age: '小学生',
                    materials: ['太陽観測用メガネ', '紙', '定規'],
                    description: '太陽の大きさを測定する実験'
                },
                {
                    name: '月の観測',
                    difficulty: '簡単',
                    age: '中学生',
                    materials: ['望遠鏡', '月面図', 'ノート'],
                    description: '月のクレーターを観察する実験'
                },
                {
                    name: '星座の観察',
                    difficulty: '中級',
                    age: '中学生',
                    materials: ['星図', 'コンパス', '懐中電灯'],
                    description: '星座を探す実験'
                },
                {
                    name: '惑星の運動',
                    difficulty: '上級',
                    age: '高校生',
                    materials: ['望遠鏡', '惑星図', '記録用紙'],
                    description: '惑星の動きを観測する実験'
                },
                {
                    name: '流星群観測',
                    difficulty: '上級',
                    age: '大学生',
                    materials: ['広角レンズ', 'カメラ', '三脚'],
                    description: '流星群を撮影する実験'
                }
            ];
        }
    },
    '惑星計算': {
        type: 'func',
        josi: [['の'], ['で']],
        pure: true,
        fn: function (semiMajorAxis, eccentricity) {
            if (semiMajorAxis <= 0 || eccentricity < 0 || eccentricity >= 1) {
                return { error: '半長軸は正の値、離心率は0以上1未満が必要です' };
            }
            const semiMinorAxis = semiMajorAxis * Math.sqrt(1 - eccentricity * eccentricity);
            // 簡略化した楕円周長計算
            const perimeter = 4 * semiMajorAxis * Math.E * eccentricity;
            return {
                semiMajorAxis: semiMajorAxis,
                semiMinorAxis: semiMinorAxis,
                eccentricity: eccentricity,
                perimeter: perimeter,
                area: Math.PI * semiMajorAxis * semiMinorAxis,
                formula: 'b = a√(1-e²)',
                timestamp: Date.now()
            };
        }
    },
    // --- 環境科学実験 ---
    '環境実験リスト': {
        type: 'func',
        josi: [],
        pure: true,
        fn: function () {
            return [
                {
                    name: '酸性雨測定',
                    difficulty: '中級',
                    age: '中学生',
                    materials: ['pH試験紙', '雨水サンプル', '容器'],
                    description: '雨水の酸性度を測定する実験'
                },
                {
                    name: '水質検査',
                    difficulty: '中級',
                    age: '高校生',
                    materials: ['水質検査キット', '川の水', '試験管'],
                    description: '水の汚染度を調べる実験'
                },
                {
                    name: '大気汚染測定',
                    difficulty: '上級',
                    age: '高校生',
                    materials: ['大気汚染測定器', 'ろ紙', '顕微鏡'],
                    description: '大気中の微粒子を測定する実験'
                },
                {
                    name: '土壌分析',
                    difficulty: '上級',
                    age: '大学生',
                    materials: ['土壌サンプル', '化学試薬', '分光器'],
                    description: '土壌の成分を分析する実験'
                },
                {
                    name: '生物多様性調査',
                    difficulty: '上級',
                    age: '大学生',
                    materials: ['調査票', 'カメラ', '図鑑'],
                    description: '地域の生物多様性を調査する実験'
                }
            ];
        }
    },
    '環境指数計算': {
        type: 'func',
        josi: [['の']],
        pure: true,
        fn: function (pollutantValues) {
            if (!pollutantValues || typeof pollutantValues !== 'object') {
                return { error: '汚染物質の値が必要です' };
            }
            const weights = {
                pm25: 0.3,
                pm10: 0.2,
                no2: 0.2,
                so2: 0.15,
                co: 0.15
            };
            let index = 0;
            let totalWeight = 0;
            Object.keys(weights).forEach(pollutant => {
                if (pollutantValues[pollutant]) {
                    index += pollutantValues[pollutant] * weights[pollutant];
                    totalWeight += weights[pollutant];
                }
            });
            const finalIndex = totalWeight > 0 ? index / totalWeight : 0;
            let level = '良好';
            if (finalIndex > 100)
                level = '重度汚染';
            else if (finalIndex > 50)
                level = '中度汚染';
            else if (finalIndex > 25)
                level = '軽度汚染';
            return {
                pollutantValues: pollutantValues,
                index: finalIndex,
                level: level,
                weights: weights,
                timestamp: Date.now()
            };
        }
    },
    // --- 高度な科学計算 ---
    '科学定数': {
        type: 'func',
        josi: [],
        pure: true,
        fn: function () {
            return {
                physics: {
                    c: 299792458, // 光速 m/s
                    g: 9.80665, // 重力加速度 m/s²
                    h: 6.62607015e-34, // プランク定数 J·s
                    k: 1.380649e-23, // ボルツマン定数 J/K
                    NA: 6.02214076e23, // アボガドロ数 mol⁻¹
                    e: 1.602176634e-19 // 素電荷 C
                },
                chemistry: {
                    R: 8.314462618, // 気体定数 J/(mol·K)
                    F: 96485.33212, // ファラデー定数 C/mol
                    atomicMassUnit: 1.66053906660e-27 // 原子質量単位 kg
                },
                astronomy: {
                    AU: 149597870700, // 天文単位 m
                    parsec: 3.08567758149137e16, // パーセク m
                    solarMass: 1.98847e30 // 太陽質量 kg
                }
            };
        }
    },
    '単位変換': {
        type: 'func',
        josi: [['を'], ['から'], ['に']],
        pure: true,
        fn: function (value, fromUnit, toUnit) {
            const conversions = {
                'm→cm': value * 100,
                'cm→m': value / 100,
                'km→m': value * 1000,
                'm→km': value / 1000,
                'g→kg': value / 1000,
                'kg→g': value * 1000,
                '°C→K': value + 273.15,
                'K→°C': value - 273.15,
                'Pa→kPa': value / 1000,
                'kPa→Pa': value * 1000,
                'J→kJ': value / 1000,
                'kJ→J': value * 1000
            };
            const key = `${fromUnit}→${toUnit}`;
            const result = conversions[key];
            if (result === undefined) {
                return { error: 'この単位変換はサポートされていません' };
            }
            return {
                value: value,
                fromUnit: fromUnit,
                toUnit: toUnit,
                result: result,
                timestamp: Date.now()
            };
        }
    },
    'meta': {
        type: 'const',
        value: {
            pluginName: 'plugin_science_experiments',
            description: '科学実験機能を提供するプラグイン',
            pluginVersion: '1.0.0',
            nakoRuntime: ['cnako', 'wnako'],
            nakoVersion: '3.6.0'
        }
    }
};
export default PluginScienceExperiments;
