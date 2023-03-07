import React from "react"
import { ArtsContextType, ContextProps } from "../@types/shared";
import Art, { Prompt } from "../models/Art"

const DUMMY_ARTS = [
  new Art('A blue ball', false),
  new Art('Cant say no more', false),
  new Art('Black cube', false)
]

const DUMMY_CATEGORIES = [
  "Flower shop", "Text to Image"
]

export const ArtContext = React.createContext<ArtsContextType> ({
    arts: [],
    addArt: () => { },
    cancelArt: (id: number) => { },
})

const ArtProvider = ({ children }: ContextProps) => {

    const [arts, setArts] = React.useState<Art[]>(DUMMY_ARTS);

    const addArtHandler = (prompt: Prompt) => {
        const newArt = new Art(prompt.textPrompt, false)
        newArt.SetSettings(prompt)
    
        // update state
        setArts((currentArts) => {
            return currentArts.concat(newArt)
        })
    }
    
    const cancelArtHandler = (artId: number) => {
        setArts((currentArts) => {
            return currentArts.filter(art => art.id !== artId)
        })
    }
    
    const contextValue: ArtsContextType = {
        arts: arts,
        addArt: addArtHandler,
        cancelArt: cancelArtHandler,
    }

    return <ArtContext.Provider value={contextValue}>
        {children}
    </ArtContext.Provider>
}

export default ArtProvider